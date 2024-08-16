import { useEffect, useState } from 'react';
import { StoreResponseForm, StoreSearchRequestForm } from '../../types/store/store.ts';
import StoreService from '../../api/store/StoreService.ts';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from '../../component/page/Pagination.tsx';
// import { useNavigate } from 'react-router';

const Stores = () => {
  // const navigate = useNavigate();

  const storeSearchParam = {
    page: 1,
    size: 10,
  } as StoreSearchRequestForm;
  const initCommand = () => storeSearchParam;

  const [stores, setStores] = useState<StoreResponseForm[]>();
  const [totalCount, setTotalCount] = useState<number>(0);

  const [command, setCommand] = useState<StoreSearchRequestForm>(initCommand);

  useEffect(() => {
    StoreService.getStores(command).then(({ data }) => {
      setStores(data.content);
      setTotalCount(data.pagination.totalElements);
    });
  }, [command]);

  return (
    <Container fluid className="p-3">
      <Row>
        <Col className="text-end">
          <Link to="/stores/0" className="btn btn-primary">
            등록
          </Link>
        </Col>
      </Row>
      <Row>
        <Table hover striped bordered className="text-center">
          <colgroup>
            <col width={80} />
            <col width={200} />
            <col width={400} />
            <col width={300} />
          </colgroup>
          <thead>
            <tr>
              <th>id</th>
              <th>업체명</th>
              <th>주소</th>
              <th>품목</th>
            </tr>
          </thead>
          <tbody>
            {!stores?.length && (
              <tr>
                <td colSpan={4}>등록된 업체가 없습니다.</td>
              </tr>
            )}
            {stores?.map((store) => (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>
                  <Link to={`/stores/${store.id}`}>{store.name}</Link>
                </td>
                <td className="text-start">{store.address}</td>
                <td>{store.items || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="mt-2">
        <Pagination
          totalCount={totalCount}
          listSize={command.size}
          currentPage={command.page}
          className="float-end"
          onChange={(page) => {
            const c = {
              ...command,
              page,
            };

            setCommand(c);

            // navigate(`?${qs.stringify(c)}`);
          }}
        />
      </Row>
    </Container>
  );
};

export default Stores;
