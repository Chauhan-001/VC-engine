import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  PDFDocument,
} from "@cantoo/pdf-lib";

import {
  arrayMove,
} from "@dnd-kit/sortable";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import ImagesUploadZone from "../../components/pdf/ImagesUploadZone";
import ImagesQueue from "../../components/pdf/ImagesQueue";
import PdfPagesPreview from "../../components/pdf/PdfPagesPreview";
import ImagesToPdfConfig from "../../components/pdf/ImagesToPdfConfig";

function ImagesToPdf() {
  const [images, setImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [pageSize, setPageSize] =
    useState("A4");

  const [
    orientation,
    setOrientation,
  ] = useState("portrait");

  const [margin, setMargin] =
    useState(20);

  const [fitMode, setFitMode] =
    useState("contain");

  const [quality, setQuality] =
    useState("high");

  const PAGE_SIZES = {
    A4: [595.28, 841.89],

    Letter: [612, 792],

    Legal: [612, 1008],
  };

  async function getImageDimensions(
    file
  ) {
    return new Promise(
      (resolve) => {
        const img =
          new Image();

        img.onload = () => {
          resolve({
            width:
              img.naturalWidth,

            height:
              img.naturalHeight,
          });

          URL.revokeObjectURL(
            img.src
          );
        };

        img.src =
          URL.createObjectURL(
            file
          );
      }
    );
  }

  async function handleFilesSelected(
    files
  ) {
    try {
      const processed =
        await Promise.all(
          files.map(
            async (file) => {
              const size =
                await getImageDimensions(
                  file
                );

              return {
                id:
                  crypto.randomUUID(),

                file,

                preview:
                  URL.createObjectURL(
                    file
                  ),

                width:
                  size.width,

                height:
                  size.height,
              };
            }
          )
        );

      setImages((prev) => [
        ...prev,
        ...processed,
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  function handleRemove(id) {
    setImages((prev) => {
      const item =
        prev.find(
          (x) => x.id === id
        );

      if (item?.preview) {
        URL.revokeObjectURL(
          item.preview
        );
      }

      return prev.filter(
        (x) => x.id !== id
      );
    });
  }

  function handleClearAll() {
    images.forEach((img) => {
      if (img.preview) {
        URL.revokeObjectURL(
          img.preview
        );
      }
    });

    setImages([]);
  }

  function handleDragEnd(event) {
    const {
      active,
      over,
    } = event;

    if (
      !over ||
      active.id === over.id
    ) {
      return;
    }

    setImages((items) => {
      const oldIndex =
        items.findIndex(
          (i) =>
            i.id === active.id
        );

      const newIndex =
        items.findIndex(
          (i) =>
            i.id === over.id
        );

      return arrayMove(
        items,
        oldIndex,
        newIndex
      );
    });
  }
    async function getImageBytes(file) {
    return new Uint8Array(
      await file.arrayBuffer()
    );
  }

  async function handleGeneratePdf() {
    if (!images.length) {
      return;
    }

    try {
      setLoading(true);

      const pdf =
        await PDFDocument.create();

      let [
        pageWidth,
        pageHeight,
      ] =
        PAGE_SIZES[pageSize] ||
        PAGE_SIZES.A4;

      if (
        orientation ===
        "landscape"
      ) {
        [pageWidth, pageHeight] =
          [
            pageHeight,
            pageWidth,
          ];
      }

      for (const item of images) {
        const bytes =
          await getImageBytes(
            item.file
          );

        let embeddedImage;

        const type =
          item.file.type;

        if (
          type.includes("png")
        ) {
          embeddedImage =
            await pdf.embedPng(
              bytes
            );
        } else {
          embeddedImage =
            await pdf.embedJpg(
              bytes
            );
        }

        const page =
          pdf.addPage([
            pageWidth,
            pageHeight,
          ]);

        const availableWidth =
          pageWidth -
          margin * 2;

        const availableHeight =
          pageHeight -
          margin * 2;

        const imageRatio =
          embeddedImage.width /
          embeddedImage.height;

        const pageRatio =
          availableWidth /
          availableHeight;

        let drawWidth;
        let drawHeight;

        // CONTAIN
        if (
          fitMode ===
          "contain"
        ) {
          if (
            imageRatio >
            pageRatio
          ) {
            drawWidth =
              availableWidth;

            drawHeight =
              drawWidth /
              imageRatio;
          } else {
            drawHeight =
              availableHeight;

            drawWidth =
              drawHeight *
              imageRatio;
          }
        }

        // COVER
        else {
          if (
            imageRatio >
            pageRatio
          ) {
            drawHeight =
              availableHeight;

            drawWidth =
              drawHeight *
              imageRatio;
          } else {
            drawWidth =
              availableWidth;

            drawHeight =
              drawWidth /
              imageRatio;
          }
        }

        const x =
          (pageWidth -
            drawWidth) /
          2;

        const y =
          (pageHeight -
            drawHeight) /
          2;

        page.drawImage(
          embeddedImage,
          {
            x,
            y,

            width:
              drawWidth,

            height:
              drawHeight,
          }
        );
      }

      // Compression Quality
      let saveOptions = {};

      if (quality === "high") {
        saveOptions = {
          useObjectStreams:
            false,
        };
      }

      if (
        quality ===
        "medium"
      ) {
        saveOptions = {
          useObjectStreams:
            true,
        };
      }

      if (quality === "low") {
        saveOptions = {
          useObjectStreams:
            true,
          addDefaultPage:
            false,
        };
      }

      const pdfBytes =
        await pdf.save(
          saveOptions
        );

      const blob =
        new Blob([pdfBytes], {
          type: "application/pdf",
        });

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download =
        `images-to-pdf-${Date.now()}.pdf`;

      document.body.appendChild(
        a
      );

      a.click();

      a.remove();

      URL.revokeObjectURL(
        url
      );
    } catch (error) {
      console.error(
        "Generate PDF Error:",
        error
      );

      alert(
        "Failed to generate PDF."
      );
    } finally {
      setLoading(false);
    }
  }
    return (
    <div
      className="
        min-h-screen
        bg-[#0a0a0a]
        text-white
      "
    >
      <Navbar />

      <main className="pt-28">
        <div
          className="
            mx-auto
            max-w-[1800px]
            px-6
            pb-24
          "
        >
          {/* Back */}
          <Link
            to="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              font-mono
              text-sm
              uppercase
              text-gray-400
              transition-colors
              hover:text-[#0066ff]
            "
          >
            <ArrowLeft size={18} />

            Back To Home
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1
              className="
                text-6xl
                font-black
                uppercase
              "
            >
              Images To PDF
            </h1>

            <p
              className="
                mt-4
                max-w-3xl
                text-lg
                text-gray-400
              "
            >
              Convert multiple images into
              a single PDF document with
              full control over page size,
              orientation, margins, and
              image fitting. Everything is
              processed locally in your
              browser.
            </p>
          </div>

          {/* Main Layout */}
          <div
            className="
              grid
              gap-8
              xl:grid-cols-[380px_1fr_360px]
            "
          >
            {/* LEFT */}
            <div className="space-y-8">
              <ImagesUploadZone
                onFilesSelected={
                  handleFilesSelected
                }
              />

              <ImagesQueue
                images={images}
                onRemove={
                  handleRemove
                }
                onClearAll={
                  handleClearAll
                }
                onDragEnd={
                  handleDragEnd
                }
              />
            </div>

            {/* CENTER */}
            <PdfPagesPreview
              images={images}
              pageSize={pageSize}
              orientation={
                orientation
              }
              margin={margin}
              fitMode={fitMode}
            />

            {/* RIGHT */}
            <ImagesToPdfConfig
              pageSize={pageSize}
              setPageSize={
                setPageSize
              }
              orientation={
                orientation
              }
              setOrientation={
                setOrientation
              }
              margin={margin}
              setMargin={
                setMargin
              }
              fitMode={fitMode}
              setFitMode={
                setFitMode
              }
              quality={quality}
              setQuality={
                setQuality
              }
              loading={loading}
              imageCount={
                images.length
              }
              onGenerate={
                handleGeneratePdf
              }
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ImagesToPdf;