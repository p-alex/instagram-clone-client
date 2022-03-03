import { useEffect, useState, useContext } from 'react';
import { CreateModalContextProvider } from '../../Context/CreateModalContext';
import { GlobalContext } from '../../Context/GlobalContext';
import { NavBarContext } from '../../Context/NavBarContext';
import { CREATE_POST_MUTATION } from '../../GraphQL/Mutations/postMutations';
import useAxiosWithRetry from '../../Hooks/useAxiosWithRetry';
import { imageOptimizer } from '../../Util/imageOptimizer';
import './CreatePostModal.scss';
import CreatePostChooseFile from './CreatePostModalComponents/CreatePostChooseFile';
import CreatePostDetails from './CreatePostModalComponents/CreatePostDetails';
import CreatePostLoading from './CreatePostModalComponents/CreatePostLoading';
import CreatePostResult from './CreatePostModalComponents/CreatePostResult';
import CreatePostTopBar from './CreatePostModalComponents/CreatePostTopBar';

const CreatePostModal = () => {
  const { user } = useContext(GlobalContext);
  const { isCreatePostModalActive, handleToggleCreatePostModal } =
    useContext(NavBarContext);
  const [title, setTitle] = useState('Create new post');
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [optimizedImageBase64, setOptimizedImageBase64] = useState<
    string | ArrayBuffer | null | undefined
  >('');

  const [createPost, { isLoading, error }] = useAxiosWithRetry({
    query: CREATE_POST_MUTATION,
    variables: {
      caption,
      image: optimizedImageBase64,
    },
    accessToken: user?.accessToken,
  });

  const handleAddPreviewImage = (base64: string) => {
    const img = document.createElement('img');
    img.src = base64;
    const imgPreview = document.querySelector('.createModal__imagePreview');
    imgPreview?.appendChild(img);
  };

  const processImage = async (selectedFile: any) => {
    const image: any = await imageOptimizer(selectedFile);
    handleAddPreviewImage(image);
    setOptimizedImageBase64(image);
  };

  useEffect(() => {
    if (selectedFile) {
      setStep(step + 1);
      processImage(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (step === 2) {
      setTitle('Preview');
    }
    if (step === 1 || step === 3) {
      setTitle('Create new post');
    }
    if (step === 4 && isLoading) {
      setTitle('Loading...');
    }
    if (step === 4 && !isLoading && !error) {
      setTitle('Success');
    }
    if (step === 4 && !isLoading && error) {
      setTitle(error);
    }
  }, [step, isLoading, error]);

  const handleSteps = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && step - 1 >= 1) {
      setStep(step - 1);
    }
    if (direction === 'next' && step + 1 <= 4) {
      setStep(step + 1);
    }
  };

  const handleDiscard = () => {
    setSelectedFile(null);
    setOptimizedImageBase64('');
    setCaption('');
    setStep(1);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      if (user?.userId && optimizedImageBase64 && selectedFile) {
        handleSteps('next');
        await createPost();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <CreateModalContextProvider>
      {isCreatePostModalActive && (
        <>
          <div
            className="createModal__backdrop"
            onClick={() => {
              handleToggleCreatePostModal();
              handleDiscard();
            }}
          ></div>
          <div className="createModal">
            <CreatePostTopBar
              step={step}
              isLoading={isLoading}
              title={title}
              handleDiscard={handleDiscard}
              handleToggleCreatePostModal={handleToggleCreatePostModal}
              handleSteps={handleSteps}
              handleSubmit={handleSubmit}
            />

            {step === 1 && <CreatePostChooseFile setSelectedFile={setSelectedFile} />}

            {step > 1 && step < 4 && (
              <CreatePostDetails step={step} caption={caption} setCaption={setCaption} />
            )}
            {step === 4 && (
              <>
                {isLoading && <CreatePostLoading />}
                {!isLoading && <CreatePostResult error={error} />}
              </>
            )}
          </div>
        </>
      )}
    </CreateModalContextProvider>
  );
};

export default CreatePostModal;
