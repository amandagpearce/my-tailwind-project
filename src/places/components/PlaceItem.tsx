import React, { useContext, useState } from 'react';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UI/Modal';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import Map from '../../shared/components/UI/Map';
import AuthContext from '../../shared/context/auth-context';

import { useHttpClient } from '../../shared/hooks/http-hook';

interface Place {
  id: string;
  image: string;
  title: string;
  address: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface PlaceItemProps extends Place {
  onDelete: (id: string) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authContext = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + authContext.token,
        }
      );

      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content p-0"
        footerClass="place-item__modal-actions text-right"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container h-72 w-full">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button className="m-1" onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button className="m-1 bg-red-600" onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>Do you really want to delete? This can't be undone.</p>
      </Modal>

      <li className="place-item m-2 h-full">
        <Card className="place-item__content p-0 relative flex flex-wrap bg-white items-start flex-col">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image w-full h-36 md:h-80">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="place-item__info p-4 text-left">
            <h2 className="text-xl mt-0 mr-0 mb-1 ml-0">{props.title}</h2>
            <h3 className="text-base mt-0 mr-0 mb-1 ml-0">{props.address}</h3>
            <p className="text-base mt-0 mr-0 mb-1 ml-0">{props.description}</p>
          </div>
          <div className="place-item__actions p-4 text-center text-sm border-t-2 border-purple w-full self-end mt-auto">
            <Button className="m-1" inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>

            {authContext.userId === props.creatorId && (
              <>
                <Button
                  className="m-1 bg-yellow-600 hover:yellow-500"
                  to={`/places/${props.id}`}
                >
                  EDIT
                </Button>
                <Button
                  className="m-1 bg-red-600 hover:red-500"
                  danger
                  onClick={showDeleteWarningHandler}
                >
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
