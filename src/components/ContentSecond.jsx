
const ContentSecond = () => {
  return (
    <div className="px-48 pt-40">
      <div>
        <div>
            <div className="w-10 bg-red-500 flex gap-20 items-center rounded">
                <div className="w-10 h-20 bg-red-500">.</div>
                <p className="text-[20px] font-bold text-red-500">
                    Today&apos;s
                </p>

            </div>
            <div>
                <p className="text-4xl font-bold pt-10 text-[#000000]">FLASH Sales</p>
            </div>
            <div className="flex">
                <section className="p-4 border rounded-xl">
                    <div >
                        <img src="https://s.udemycdn.com/career-academies/product-cards/career-card-fswd.png" alt=""
                        className="w-[450px] h-[250px] rounded-lg"
                        />
                    </div>
                    <div className="space-y-4 pt-4">
                        <p>Full Stack Web Developer</p>
                        <div ><span>$127,005 average salary (US)</span><span>&nbsp;&nbsp;•&nbsp;&nbsp;</span><span>16,500 open roles (US)</span></div>
                        <div>
                            <ul className="flex gap-4">
                                <li><span className="border p-1 rounded">
                                    4.7</span></li>
                                <li>
                                    <span className="border p-1 rounded">498k rating</span>
                                </li>
                                <li><span className="border p-1 rounded">87 total hours</span></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ContentSecond
