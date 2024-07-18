import "./PageContainer.scss";

function PageContainer(props) {
  return <main className="page-container">{props.children}</main>;
}

export default PageContainer;
