import logo from "@/assets/wxad-design.svg"

const Header: React.FC = () => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-solid border-neutral-200">
      <div className="px-6 h-16 mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="M7.529 16.471C2.59 11.533.589 5.527 3.058 3.058C5.048 1.067 9.338 1.982 13.513 5m2.958 2.529c4.939 4.939 6.94 10.944 4.471 13.413c-1.989 1.989-6.27 1.078-10.442-1.932M20.942 3.058c2.47 2.469.468 8.474-4.47 13.413c-4.94 4.939-10.945 6.94-13.414 4.471c-1.991-1.99-1.076-6.28 1.942-10.455a24.48 24.48 0 0 1 2.529-2.958C12.468 2.59 18.473.589 20.942 3.058Z" /><path d="M14.5 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z" /></g></svg>
          微信广告移动端模板
        </div>
        <a href="https://wxad.design">
          <img className="block w-24" src={logo} alt="wxad.design" />
        </a>
      </div>
    </div>
  )
}

export default Header