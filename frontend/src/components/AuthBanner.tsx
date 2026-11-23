import HeaderImage from "../assets/header-transparent.webp"

const AuthBanner = () => {
    return (
      <div className="bg-black text-white min-h-lvh flex flex-col justify-center items-center gap-4">
        <img src={HeaderImage} alt="logo" width={132} />
        <h1 className="text-3xl max-w-3/4 text-center">Build a board, get the job done before anyone else</h1>
      </div>
    )
  }
  
  export default AuthBanner