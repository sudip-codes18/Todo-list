function SocialLink(name , url , bgcolor){


    return(

        <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full py-3 px-4 text-white font-medium rounded-lg text-center transition-all duration-300 hover:scale-105 cursor-pointer ${bgColor}`}
    >

        {name}


    </a>
    )
}

export default SocialLink; 