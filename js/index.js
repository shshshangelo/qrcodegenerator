let qrCode;

function generateQRCode() {
  const text = document.getElementById("text").value;
  const size = parseInt(document.getElementById("size").value);
  const margin = parseInt(document.getElementById("margin").value);
  const type = document.getElementById("type").value;
  const quality = parseFloat(document.getElementById("quality").value);
  const errorCorrection = document.getElementById("error").value;
  const foregroundColor = document.getElementById("foreground").value;
  const backgroundColor = document.getElementById("background").value;
  const logoInput = document.getElementById("logo-upload");
  
  if (!text.trim()) {
    alert("Please enter text for the QR code.");
    return;
  }

  let imageUrl = "";
  if (logoInput.files.length > 0) {
    imageUrl = URL.createObjectURL(logoInput.files[0]);
  }

  document.getElementById("qr-code").innerHTML = "";

  qrCode = new QRCodeStyling({
    width: size,
    height: size,
    data: text,
    margin,
    type,
    quality,
    image: imageUrl,
    dotsOptions: {
      color: foregroundColor,
      type: "square"
    },
    backgroundOptions: {
      color: backgroundColor
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
      imageSize: 0.2
    },
    qrOptions: {
      errorCorrectionLevel: errorCorrection
    }
  });

  qrCode.append(document.getElementById("qr-code"));
  document.getElementById("download-btn-container").style.display = "block";
}

function downloadQRCode() {
  const type = document.getElementById("type").value;
  qrCode.download({ name: "qr-code", extension: type });
}

function resetForm() {
  document.getElementById("qr-code").innerHTML = "";
  document.getElementById("download-btn-container").style.display = "none";
  document.getElementById("text").value = "";
  document.getElementById("logo-upload").value = "";
}
