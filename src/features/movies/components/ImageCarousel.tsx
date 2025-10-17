import React from "react"
import type { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"


import { DotButton, useDotButton } from "@/components/ui/CarouselDotButton"
import { NextButton, PrevButton, usePrevNextButtons } from "@/components/ui/CarouselButton"
import "@/css/embla.css"
import type { ImageItem } from "@/types/image.type"
import { imageURL } from "@/constants"


type PropType = {
  images?: ImageItem[]
  options?: EmblaOptionsType
}

const ImageCarousel: React.FC<PropType> = ({ images }) => {
  // Initialize Embla
  const [emblaRef, emblaApi] =useEmblaCarousel({
  containScroll: 'trimSnaps',
  slidesToScroll: 3,
  loop: false,
});

  // Dot buttons
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi!)

  // Prev/Next buttons
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi!)

  return (
    <section className="relative w-full">
      {/* --- Embla viewport --- */}
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container_images flex">
          {images?.slice(0,12).map(
            (image) =>
              image.file_path && (
                <div className="embla__slide relative flex-[0_0_100%] h-32 md:h-54 lg:h-[16rem]" key={image.file_path}>
                  <img
                    src={imageURL + image.file_path}
                    alt="Slide image"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )
          )}
        </div>
      </div>

      {/* --- Controls --- */}
      {/* --- Controls --- */}
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            className="pointer-events-auto w-8 bg-black/30 hover:bg-black/50 rounded-full p-2 m-2 text-white"
        >

        </PrevButton>
        <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            className="pointer-events-auto w-8 bg-black/30 hover:bg-black/50 rounded-full p-2 m-2 text-white"
        />
        </div>


      {/* --- Dots --- */}
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
    </section>
  )
}

export default ImageCarousel
