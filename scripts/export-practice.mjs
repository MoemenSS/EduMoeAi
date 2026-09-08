import fs from "node:fs";
import ts from "typescript";
function load(file, imports = {}) {
  const source = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;
  const compiledModule = { exports: {} };
  new Function("require", "module", "exports", source)(
    (name) => imports[name],
    compiledModule,
    compiledModule.exports,
  );
  return compiledModule.exports;
}
const variations = load("lib/question-variations.ts");
const bank = load("lib/question-bank.ts", {
  "./question-variations": variations,
});
process.stdout.write(JSON.stringify(bank.questionBank));
