import AstServiceContext from '../context/ast-service-context';

const WithAstService = () => (Wrapped) => {
  return (props) => {
    return (
      <AstServiceContext.Consumer>
        {
          (AstService) => {
            return <Wrapped {...props} AstService={AstService} />
          }
        }
      </AstServiceContext.Consumer>
    )
  };
};

export default WithAstService;