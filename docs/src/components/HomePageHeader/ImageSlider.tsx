import styles from './styles.module.css'
import Slider from 'react-slick'

const sliderSettings = {
  adaptiveHeight: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
  infinite: true,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  slidesToScroll: 1,
  slidesToShow: 3,
  speed: 500,
}

const sliderImages = [
  {
    src: '/img/iphone_signup_draft_light.png',
    alt: 'First iPhone draft',
  },
  {
    src: '/img/iphone_signup_draft_dark.png',
    alt: 'Second iPhone draft',
  },
  {
    src: '/img/iphone_settings_draft_light.png',
    alt: 'Third iPhone draft',
  },
  {
    src: '/img/iphone_settings_draft_dark.png',
    alt: 'Fourth iPhone draft',
  },
]

export default function ImageSlider() {
  return (
    <div className={styles.sliderContainer}>
      <Slider {...sliderSettings}>
        {sliderImages.map((image, index) => (
          <div key={index} className={styles.imageWrapper}>
            <img src={image.src} alt={image.alt} className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
