const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return ( <div className="h-full w-[100vw] flex flex-col   items-center content-center " >
         {children} 
      
    </div> );
}
 
export default AuthLayout;
