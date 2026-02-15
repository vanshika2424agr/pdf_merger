const PDFMerger = require('pdf-merger-js').default;
async function mergePdfs(p1, p2, outputPath) {
    const merger = new PDFMerger();
    console.log("Adding:", p1);
    console.log("Adding:", p2);

    await merger.add(p1);
    await merger.add(p2);
    console.log("Saving to:", outputPath);
    await merger.save(outputPath);
    console.log("Merge completed");
}
module.exports = { mergePdfs };


