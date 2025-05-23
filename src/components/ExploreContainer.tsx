import "./ExploreContainer.css"

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div id="container">
      <strong>Ready to create an app?</strong>
      <p>Start with Ionic <a href="https://ionicframework.com/docs/components" rel="noopener noreferrer" target="_blank">UI Components</a></p>
    </div>
  )
}

export default ExploreContainer
