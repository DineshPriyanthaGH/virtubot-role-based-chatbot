import React from 'react'
const SocialSignUp = () => {
  return (
    <div className="flex justify-center space-x-4">
      <button className="p-3 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-all transform hover:scale-105">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google"
          className="w-5 h-5"
        />
      </button>
      <button className="p-3 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-all transform hover:scale-105">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg"
          alt="Facebook"
          className="w-5 h-5"
        />
      </button>
      <button className="p-3 bg-white bg-opacity-10 rounded-md hover:bg-opacity-20 transition-all transform hover:scale-105">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg"
          alt="Twitter"
          className="w-5 h-5"
        />
      </button>
    </div>
  )
}
export default SocialSignUp
