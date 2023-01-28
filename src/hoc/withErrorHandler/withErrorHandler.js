import React, { useEffect, useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);
    console.log(error);

    const reqInterceptor = axios.interceptors.request.use(
      (req) => {
        setError(null);
        return req;
      },
      (err) => {
        setError(err);
      }
    );
    const resInterceptor = axios.interceptors.response.use(
      (res) => {
        setError(null);
        return res;
      },
      (err) => {
        setError(err);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
