import React, {ReactNode} from 'react'
import {getUser} from './actions/getUser'
import {LogoutButton} from './component/LogoutButton'

const Template: React.FC<{children: ReactNode}> = async ({children}) => {
  const user = await getUser()

  return <>
    <div className={`bg-violet-500 p-4`}>
      <LogoutButton />
    </div>
    {children}
  </>

}

export default Template