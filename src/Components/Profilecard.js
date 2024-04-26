import React from 'react'

function Profilecard(props) {
  return (
    <>
      <div class="h-[48px] w-[320px]  flex my-4 cursor-pointer">
    <img class="h-[48px] w-[48px] rounded-full" alt='profile-img' src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" />
    <div class="h-[48px] w-272 ml-[25px]">
        <p class="text-[16px] font-[600]">
                {props.name}
        </p>
        <p class="text-[14px] text-gray-500">
                {props.email}
        </p>

    </div>
</div>
    </>
  )
}

export default Profilecard
