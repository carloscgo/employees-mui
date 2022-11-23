import React, { memo, useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import get from "lodash/get";
import unset from "lodash/unset";

import ErrorBoundary from '../../components/ErrorBoundary';

import Error from '../../components/Error';
import Loading from "../../components/Loading";
import Toast from '../../components/Toast';
import Sidebar from "../../components/Sidebar";

/*import NavBar from '../../components/Navbars';
import Footer from "../../components/Footer";
*/

import routes from '../../utils/routes';
import {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
  searchRoute
} from '../../utils/services';
import Context from '../../utils/context';

import {
  makeDataSelector as makeDataSelectorError
} from '../../utils/services/getError/selectors';
import {
  cleanErrorAction
} from '../../utils/services/getError/actions';

import {
  makeDataSelector as makeDataSelectorEmployees
} from '../../utils/services/employees/selectors';
import reducerError from '../../utils/services/getError/reducer';
import reducerEmployees from '../../utils/services/employees/reducer';
import sagaEmployees from '../../utils/services/employees/saga';
import {
  getAllRequestAction,
  deleteRequestAction,
  addRequestAction,
  updateRequestAction,
} from '../../utils/services/employees/actions';

import Container from './styles';
import {
  PropsApp, PropsRoute, IFunc, IPaginate, IEmployee, ITypeForm, PropsEmployee
} from '../../utils/interfaces';

import sidebarImage from "../../assets/sidebar-5.jpg";

const PAGE = {
  limit: 8,
  skip: 0
}

type PropForm = {
  type: ITypeForm | string,
  data: PropsEmployee
}

const App = ({
  error,
  employees,
  getAllRequestActionHandler,
  deleteRequestActionHandler,
  addRequestActionHandler,
  updateRequestActionHandler,
  cleanErrorActionHandler,
}: PropsApp) => {
  const [currentPage, setCurrentPage] = useState(1)

  const location = useLocation()
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({
    loading: false,
    data: [],
    paginate: PAGE,
    message: null
  })
  const [toast, setToast] = useState(false)

  useInjectReducer({ key: 'error', reducer: reducerError })
  useInjectReducer({ key: 'employees', reducer: reducerEmployees })
  useInjectSaga({ key: 'employees', saga: sagaEmployees })

  useEffect(() => {
    getAllRequestActionHandler(PAGE)
  }, [])

  useEffect(() => {
    setToast(!!data.message)
  }, [data.message])

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(searchRoute('home'))
    }
  }, [location.pathname])

  useEffect(() => {
    setData({
      loading: get(employees, 'loading', true),
      data: get(employees, 'data', []),
      paginate: get(employees, 'paginate', {
        ...PAGE,
        total: 0
      }),
      message: get(employees, 'message', null),
    })
  }, [employees])

  const handlerForm = (type: string, data: PropsEmployee) => {
    const values = {
      ...data
    }

    if (type === 'new') {
      unset(values, 'id')

      addRequestActionHandler(values)
    } else {
      updateRequestActionHandler(data.id, values)
    }
  }

  return (
    <ErrorBoundary>
      <Context.Provider
        value={{
          employees: data.data,
          paginate: data.paginate,
          message: data.message,
          onLoad: () => {
            getAllRequestActionHandler({ ...PAGE, skip: data.paginate.limit * currentPage })

            setCurrentPage(state => state + 1)
          },
          onDelete: (id: number) => deleteRequestActionHandler(id),
          onSave: ({ type, data }: PropForm) => handlerForm(type.toString(), data)
        }}>
        <Container>
          <Toast open={toast} message={data.message} onClose={() => setToast(false)} />
          <Sidebar color="black" onClean={cleanErrorActionHandler} image={sidebarImage} routes={routes} />

          <div className="main-panel">

            <Container.Content className={`${data.loading ? 'p-0' : ''}`}>
              {error && <Error message={error} />}

              <Loading show={data.loading} />

              {!data.loading &&
                <Routes>
                  {routes.map((route: PropsRoute, index: number) => (
                    <Route key={index} path={route.path} element={route.component} />
                  ))}
                </Routes>
              }
            </Container.Content>

          </div>
        </Container>
      </Context.Provider>
    </ErrorBoundary>
  )
}

const mapStateToProps = createStructuredSelector({
  error: makeDataSelectorError(),
  employees: makeDataSelectorEmployees()
});

export const mapDispatchToProps = (dispatch: IFunc) => ({
  getAllRequestActionHandler: (data: IPaginate) => dispatch(getAllRequestAction(data)),
  deleteRequestActionHandler: (id: number) => dispatch(deleteRequestAction(id)),
  addRequestActionHandler: (data: IEmployee) => dispatch(addRequestAction(data)),
  updateRequestActionHandler: (id: number, data: IEmployee) => dispatch(updateRequestAction(id, data)),
  cleanErrorActionHandler: () => dispatch(cleanErrorAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
)(App) as React.FunctionComponent<any>;
