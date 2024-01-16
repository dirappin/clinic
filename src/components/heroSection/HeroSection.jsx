

const HeroSection = ( { name, images, nameService}) => {
  return (
    <div>
        <div>
                <h1 className=" text-blue-500 uppercase font-bold text-center text-[24px]">
                    centre medical wellness clinic
                </h1>
                <h3 className="uppercase text-orange-400 font-bold text-center pt-6">
                    {name}
                </h3>
            </div>

            <div>
                <div className=" flex ">
                    <div className=" pt-40">
                        <h1 className="uppercase  text-blue-500 font-extrabold leading-8  text-[28px]">
                            medical  {nameService}  service
                        </h1>
                        <p className=" text-primary-400 pt-8">
                            Jericho Road Community Health Center provides high-quality medical care for the whole family — especially people with limited access to medical care, like families living in poverty, refugees, and immigrants. We provide full-spectrum care to all, even those without insurance or the ability to pay. All of our services exist for and with our patients in mind.
                        </p>
                    </div>
                    <div >
                        <img src={images} alt="DoctorAvatar1" className=" w-[4000px] h-[750px]"  />
                    </div>
                </div>
            </div>

    </div>
  )
}

export default HeroSection