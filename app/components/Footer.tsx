import Image from "next/image"

const Footer = () => {
  const companyLogos = ["https://marketplace.canva.com/EAFaFUz4aKo/2/0/1600w/canva-yellow-abstract-cooking-fire-free-logo-JmYWTjUsE-Q.jpg", "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png", "https://eswpcd25uod.exactdn.com/blog/wp-content/uploads/2017/05/01-1024x1024.jpg?strip=all&lossy=1&ssl=1"]

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} My Personal Website. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {companyLogos.map((logo, index) => (
              <Image
                key={index}
                src={logo || "/placeholder.svg"}
                alt={`Company logo ${index + 1}`}
                width={40}
                height={40}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

