import React from 'react'

const about = () => {
  return (
    <div>
        <div className="hero bg-[seagreen] text-[whitesmoke] min-h-screen">
  <div className="hero-content flex-col lg:flex-row">
    <img
      src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
      className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Vshop</h1>
      <p className="py-6 text-lg">
        Vshop is a virtual shop. you can purchase from anywhere.
      </p>
      <button className="btn btn-primary">Let's Purchase</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default about