// script.js
async function convertImage() {
  const imgUrl = document.getElementById("imageUrl").value;

  try {
    const response = await fetch(imgUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const img = new Image();
    const objectURL = URL.createObjectURL(blob);

    img.onload = function () {
      ImageTracer.imageToSVG(
        img.src,
        function (svgstr) {
          ImageTracer.appendSVGString(svgstr, "svgcontainer");
          svgstr = svgstr.replaceAll('fill="rgb(0,0,0)"', 'fill="transparent"');
          svgstr = svgstr.replaceAll(
            'fill="rgb(255,255,255)"',
            'fill="transparent"'
          );
          console.log(svgstr);
          const link = document.createElement("a");
          link.href =
            "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgstr);
          link.download = "converted_image.svg";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        "posterized2"
      );
    };

    img.onerror = () => {
      alert("Failed to load the image. Please check the URL.");
    };

    img.src = objectURL;
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Failed to load the image. Please check the URL.");
  }
}
