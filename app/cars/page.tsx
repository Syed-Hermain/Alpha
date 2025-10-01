

import InfiniteCarousel from "@/components/InfiniteCarousel";



export default function SpinnyCarPage() {
  

  const cars = [
    { src: "/cars1.avif", alt: "Car 1" },
    { src: "/cars2.avif", alt: "Car 2" },
    { src: "/cars3.avif", alt: "Car 3" },
    { src: "/cars4.avif", alt: "Car 4" },
    { src: "/cars5.avif", alt: "Car 5" },
    { src: "/cars6.avif", alt: "Car 6" },
    { src: "/cars7.avif", alt: "Car 7" },
    { src: "/cars8.avif", alt: "Car 8" },
    { src: "/cars9.avif", alt: "Car 9" },
    { src: "/cars10.avif", alt: "Car 10" },
    { src: "/cars11.avif", alt: "Car 11" },
    { src: "/cars12.avif", alt: "Car 12" },
    { src: "/cars13.avif", alt: "Car 13" },
    { src: "/cars14.avif", alt: "Car 14" },
    { src: "/cars15.avif", alt: "Car 15" },
    { src: "/cars16.avif", alt: "Car 16" },
    { src: "/cars17.avif", alt: "Car 17" },
    { src: "/cars18.avif", alt: "Car 18" },
    { src: "/cars19.avif", alt: "Car 19" },
    { src: "/cars20.avif", alt: "Car 20" },
    { src: "/cars21.avif", alt: "Car 21" },
    { src: "/cars22.avif", alt: "Car 22" },
    { src: "/cars23.avif", alt: "Car 23" },
    { src: "/cars24.avif", alt: "Car 24" },
    { src: "/cars25.avif", alt: "Car 25" },
    { src: "/cars26.avif", alt: "Car 26" },
    { src: "/cars27.avif", alt: "Car 27" },
    { src: "/cars28.avif", alt: "Car 28" },
    { src: "/cars29.avif", alt: "Car 29" },
  ];


  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">GSAP Car Image Carousel</h1>
        <div className="">
      <InfiniteCarousel cars={cars} />
</div>


      <div className="mt-10">
        About the info of this thang. Now let consider the view of this.
      </div>
    </div>
  );
}
