import { useNavigate, useParams } from 'react-router';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Image, Row, Table } from 'react-bootstrap';
import InlineForm from '../../../component/form/InlineForm.tsx';
import { ItemTagSearchRequestForm } from '../../../types/category/category.ts';
import ItemTagService from '../../../api/itemTag/ItemTagService.ts';
import StoreService from '../../../api/store/StoreService.ts';
import { StoreImageAdminResponse, StoreResponse, StoreSaveRequestForm } from '../../../types/store/store.ts';
import { MultiSelect, Option } from 'react-multi-select-component';
import { Link } from 'react-router-dom';
import UploadService from '../../../api/upload/UploadService.ts';
import { generateRandomString } from '../../../util/stringUtil.ts';

const StoreDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const imageInputId = generateRandomString(20);

  // const [store, setStore] = useState<StoreResponseForm>();
  const [isNew, setIsNew] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [descriptions, setDescriptions] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [homepage, setHomepage] = useState<string | null>(null);
  const [openingHours, setOpeningHours] = useState<string | null>(null);
  const [representativeName, setRepresentativeName] = useState<string | null>(null);
  const [identificationNumber, setIdentificationNumber] = useState<string | null>(null);
  const [items, setItems] = useState<string | null>(null);

  const [imageUrls, setImageUrls] = useState<StoreImageAdminResponse[] | null>(null);

  const [itemTagOptions, setItemTagOptions] = useState<Option[]>([]);
  const [selectedItemTagIds, setSelectedItemTagIds] = useState<Option[]>([]);

  useEffect(() => {
    if (id && !Number.isNaN(id) && +id) {
      setIsNew(false);

      StoreService.getStoresDetail(+id).then(({ data: { data: store } }) => {
        setStoreData(store);

        ItemTagService.getItemTagsPage({
          page: 1,
          size: 10000,
        } as ItemTagSearchRequestForm).then(({ data: itemTags }) => {
          const options = itemTags.data.map((itemTag) => ({ label: itemTag.name, value: itemTag.id }) as Option);

          setItemTagOptions(options);

          if (store?.itemTagIds?.length && options.length) {
            setSelectedItemTagIds(options.filter((o) => store.itemTagIds?.includes(+o.value)));
          }
        });
      });
    } else {
      setIsNew(true);

      ItemTagService.getItemTagsPage({
        page: 1,
        size: 10000,
      } as ItemTagSearchRequestForm).then(({ data: itemTags }) => {
        const options = itemTags.data.map((itemTag) => ({ label: itemTag.name, value: itemTag.id }) as Option);

        setItemTagOptions(options);
      });
    }
  }, [id]);

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

  const handleDescriptionsTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setDescriptions(value);
  };

  const handleAddressInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setAddress(value);
  };

  const handleLatInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value && !Number.isNaN(value)) {
      setLat(+value);
    } else {
      setLat(null);
    }
  };

  const handleLngInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value && !Number.isNaN(value)) {
      setLng(+value);
    } else {
      setLng(null);
    }
  };

  const handleContactNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setContactNumber(value);
  };

  const handleHomepageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setHomepage(value);
  };

  const handleOpeningHoursInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setOpeningHours(value);
  };

  const handleRepresentativeNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setRepresentativeName(value);
  };

  const handleIdentificationNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setIdentificationNumber(value);
  };

  const handleItemsInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setItems(value);
  };

  const handleItemTagSelect = (options: Option[]) => {
    setSelectedItemTagIds(options);
  };

  const imageFileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files !== undefined && files !== null && files.length > 0) {
      const file = files[0];

      UploadService.storeUploadImage(file).then(({ data }) => {
        const { fileKey, fileUrl } = data.data;

        if (imageUrls?.length) {
          setImageUrls([
            ...imageUrls,
            {
              id: null,
              fileKey,
              imageUrl: fileUrl,
            },
          ]);
        } else {
          setImageUrls([
            {
              id: null,
              fileKey,
              imageUrl: fileUrl,
            },
          ]);
        }
      });
    }

    e.target.value = '';
  };

  const handleDeleteImageButton = (fileKey: string) => {
    setImageUrls(imageUrls?.filter((file) => file.fileKey !== fileKey) || []);
  };

  const handleSubmit = () => {
    if (!selectedItemTagIds.length) {
      alert('태그를 선택해주세요');
      return;
    }

    const uploadImageUrls = imageUrls?.map((image) => image.fileKey);
    const itemTagIds = selectedItemTagIds.map((tag) => +tag.value);

    const requestForm = {
      name,
      descriptions,
      address,
      lat,
      lng,
      contactNumber,
      homepage,
      openingHours,
      representativeName,
      identificationNumber,
      items,
      imageUrls: uploadImageUrls,
      itemTagIds,
    } as StoreSaveRequestForm;

    if (isNew) {
      StoreService.saveStore(requestForm).then(() => toList());
    } else {
      if (id) {
        StoreService.updateStore(+id, requestForm).then(() => toList());
      }
    }
  };

  const setStoreData = (store: StoreResponse) => {
    setName(store.name);
    setDescriptions(store.descriptions);
    setAddress(store.address);
    setLat(store.lat);
    setLng(store.lng);
    setContactNumber(store.contactNumber);
    setHomepage(store.homepage);
    setOpeningHours(store.openingHours);
    setRepresentativeName(store.representativeName);
    setIdentificationNumber(store.identificationNumber);
    setItems(store.items);

    setImageUrls(store.imageUrls);
  };

  const toList = () => navigate('/stores');

  return (
    <Container fluid>
      <h1 className="h3 mb-3">업체 {isNew ? '등록' : '수정'}</h1>
      <Row>
        <Table bordered>
          <colgroup>
            <col width={150} />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td className="text-center">
                <b>업체명</b>
              </td>
              <td>
                <InlineForm width={500}>
                  <Form.Control type="text" value={name} onChange={handleNameInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>업체 설명</b>
              </td>
              <td>
                <InlineForm width={800}>
                  <Form.Control
                    as="textarea"
                    value={descriptions || ''}
                    onChange={handleDescriptionsTextarea}
                    rows={5}
                  />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>주소</b>
              </td>
              <td>
                <InlineForm width={800}>
                  <Form.Control type="text" value={address || ''} onChange={handleAddressInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>위도</b>
              </td>
              <td>
                <InlineForm width={300}>
                  <Form.Control type="text" value={lat || ''} onChange={handleLatInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>경도</b>
              </td>
              <td>
                <InlineForm width={300}>
                  <Form.Control type="text" value={lng || ''} onChange={handleLngInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>연락처</b>
              </td>
              <td>
                <InlineForm width={300}>
                  <Form.Control type="text" value={contactNumber || ''} onChange={handleContactNumberInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>홈페이지 주소</b>
              </td>
              <td>
                <InlineForm width={500}>
                  <Form.Control type="text" value={homepage || ''} onChange={handleHomepageInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>영업시간</b>
              </td>
              <td>
                <InlineForm width={400}>
                  <Form.Control type="text" value={openingHours || ''} onChange={handleOpeningHoursInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>대표자명</b>
              </td>
              <td>
                <InlineForm width={200}>
                  <Form.Control type="text" value={representativeName || ''} onChange={handleRepresentativeNameInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>사업자 등록 번호</b>
              </td>
              <td>
                <InlineForm width={200}>
                  <Form.Control
                    type="text"
                    value={identificationNumber || ''}
                    onChange={handleIdentificationNumberInput}
                  />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>상세품목</b>
              </td>
              <td>
                <InlineForm width={300}>
                  <Form.Control type="text" value={items || ''} onChange={handleItemsInput} />
                </InlineForm>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>이미지 첨부</b>
              </td>
              <td>
                <Row>
                  <Col>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => {
                        const input = document.getElementById(imageInputId) as HTMLInputElement;
                        if (!input) return;
                        input.click();
                      }}
                    >
                      이미지 추가
                    </Button>
                    <span> (이미지는 최대 10장까지만 업로드 가능합니다)</span>
                    <input
                      type="file"
                      id={imageInputId}
                      accept="image/png, image/gif, image/jpeg"
                      onChange={imageFileUploadHandler}
                      style={{ display: 'none' }}
                    />
                  </Col>
                </Row>
                <Row>
                  {imageUrls?.length
                    ? imageUrls.map((image) => (
                        <Row key={image.fileKey} className="mt-2">
                          <Image
                            src={image.imageUrl}
                            alt="이미지"
                            style={{
                              maxWidth: '300px',
                            }}
                          />
                          <InlineForm width={100}>
                            <Button variant="outline-danger" onClick={() => handleDeleteImageButton(image.fileKey)}>
                              삭제
                            </Button>
                          </InlineForm>
                        </Row>
                      ))
                    : ''}
                </Row>
              </td>
            </tr>
            <tr>
              <td className="text-center">
                <b>카테고리</b>
              </td>
              <td>
                <InlineForm width={300}>
                  <MultiSelect
                    options={itemTagOptions}
                    value={selectedItemTagIds}
                    onChange={handleItemTagSelect}
                    hasSelectAll={false}
                    labelledBy="전체"
                  ></MultiSelect>
                </InlineForm>
              </td>
            </tr>
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col className="text-end">
          <Button type="button" variant="primary" onClick={handleSubmit}>
            {isNew ? '등록' : '수정'}
          </Button>
          <Link to={'/stores'} className="btn btn-danger ms-2">
            목록
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default StoreDetail;
