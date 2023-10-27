import { useRouteError } from "react-router-dom";


const ErrorPage = () => {

  const error = useRouteError();

  return (
    <div id="error-page" className="h-view-screen">
      <img src="/src/assets/siteground-404-page.png" alt="" />
    </div>
  )
}

export default ErrorPage