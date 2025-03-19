import React from 'react'

export const Stats = () => {
  return (
    <main className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-white'} h-full p-4 ml-auto `}>
    {/* <div className=''>
        <WelcomeBanner />
    </div> */}
    <div className='cards grid grid-cols-12 min-w-[13rem]  gap-6 mt-[2rem]  '>

        <DashboardCard01 />
        <DashboardCard02 />
        <DashboardCard03 />
        <DashboardCard04 />
         <DashboardCard05 />
        <DashboardCard06 />
        <DashboardCard07 />
        <DashboardCard08 />
        <DashboardCard09 />
        <DashboardCard11 />
        <DashboardCard12 />
        <DashboardCard13 />
        </div>
    </main>
  )
}
