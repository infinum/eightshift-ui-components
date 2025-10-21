// Script to inline the built worker file as a JS string export
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const workerPath = path.resolve('dist/worker/image-analysis.worker.js');
const outputPath = path.resolve('lib/components/smart-image/worker-inline.js');

const code = JSON.stringify(readFileSync(workerPath, 'utf8'));

const out = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Run the build-worker script to update.
export default ${code};
`;

writeFileSync(outputPath, out);
console.log('Inlined worker written to', outputPath);
