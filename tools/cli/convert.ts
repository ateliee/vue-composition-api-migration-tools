import Parser from "@/tools/vue-composition-converter/parser";
import * as fs from "fs";

/**
 * Option API to Composition API converter
 */
const convertCompositonApi = (text: string) => {
	const { scriptContent, templateContent, styleContent, styleAttributes } = parseSfc(text);
	if (!scriptContent){
		return;
	}
    const ParseInput = new Parser(
        scriptContent,
        {
            showSectionComment: true,
        }
    );
    const { imports, output, importDeclarations } = ParseInput.parse();

    // Add required imports (e.g. ref, computed, etc.)
    if (imports.length > 0) {
        output.unshift(`import { ${imports.join(', ')} } from 'vue';\n`);
    }

    // Add original import declarations to the top
    if (importDeclarations) {
        output.unshift(...importDeclarations);
    }

    const updatedCode = format(output.join('\n'));

    // Get the composition output and replace &lt; and &gt; with < and >
    return composeSfc(
        updatedCode,
        templateContent,
        styleContent,
        styleAttributes
    );
}
(() => {
    const filePath: string | undefined = process.argv[2];
    console.log('> read file');
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
        console.error('> file not found');
        process.exit(1);
    }
    const text = fs.readFileSync(filePath, {encoding: 'utf-8'});
    console.log('> read contents');
    console.log(text);
    
    const output = convertCompositonApi(text)
    if (!output) {
        console.error('> no output');
        process.exit(1);
    }
    console.log('> output contents');
    console.log(output);
    fs.writeFileSync(filePath, output);    
})()