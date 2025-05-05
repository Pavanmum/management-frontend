

const Header = () => {
  return (
    <div>
     <div className="p-4 flex  bg-[#000]  justify-center items-center ga-10">
        <div className="text-[#FAFAFA] text-[20px] flex justify-between w-full max-w-[1020px]">

        <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <u>
        <a href="#" className="text-[#FAFAFA]">Shop Now</a>
        </u>
        </p>
        <div className="text-[#FAFAFA] text-[20px] ">
          <select className="bg-[#000]" name="English" id="english">
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
        </div>
      
       
    </div> 
    <div className="header border-b border-[#363738]">
    <div className="p-8 flex gap-20 items-center justify-between mx-40">
      <div className="heading-1 text-3xl font-bold">
        Exclusive
      </div>
      <div className="heading-2">
        <ul className="flex space-x-10">
          <li className="text-[#000] text-[20px]">Home</li>
          <li className="text-[#000] text-[20px]">Shop</li>
          <li className="text-[#000] text-[20px]">About</li>
          <li className="text-[#000] text-[20px]">Contact</li>
        </ul>
      </div>
      <div className="heading-3 flex gap-4 ">
        <div className="flex bg-[#F5F5F5] items-center border-none outline-none p-1 gap-4">
          <input type="text" placeholder="What are you looking for" className=" p-2" 
          />
          <img src="/assests/Component 2.png" alt="Vector.png" className=""/>

        </div>
        <div className="p-1 flex gap-4 items-center">
          <img src="/assests/Vector.png" alt="Vector.png" className="w-5 h-5"/>
          <img src="/assests/Cart1 with buy.png" alt="Vector.png" className="w-7 h-7" />

        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Header
