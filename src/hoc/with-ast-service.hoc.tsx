import React from 'react';
import AstServiceContext from '../context/ast-service-context';
import AstService from '../services/ast-shop-service';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

type AstServiceType = {
   AstService: AstService
};

const WithAstService = () =><P extends object>(Wrapped:React.ComponentType<P>,):React.FC<Omit<P, keyof AstServiceType>> => {
  return (props) => {
    return (
      <AstServiceContext.Consumer>
        {
          (AstService) => {
            return <Wrapped {...props as P} AstService={AstService} />
          }
        }
      </AstServiceContext.Consumer>
    )
  };
};

export default WithAstService;