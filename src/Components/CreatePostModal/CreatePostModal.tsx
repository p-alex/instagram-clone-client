import { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../Context/GlobalContext';
import { NavBarContext } from '../../Context/NavBarContext';
import { CREATE_POST_MUTATION } from '../../GraphQL/Mutations/postMutations';
import useAxiosWithRetry from '../../Hooks/useAxiosWithRetry';
import './CreatePostModal.scss';
import CreatePostChooseFile from './CreatePostModalComponents/CreatePostChooseFile';
import CreatePostDetails from './CreatePostModalComponents/CreatePostDetails';
import CreatePostLoading from './CreatePostModalComponents/CreatePostLoading';
import CreatePostSuccess from './CreatePostModalComponents/CreatePostSuccess';
import CreatePostTopBar from './CreatePostModalComponents/CreatePostTopBar';

const CreatePost = () => {
  const { user } = useContext(GlobalContext);
  const { isCreatePostModalActive, handleToggleCreatePostModal } =
    useContext(NavBarContext);
  const [title, setTitle] = useState('Create new post');
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null | undefined>(
    ''
  );
  const [imageError, setImageError] = useState('');

  const [createPost, { isLoading, error }] = useAxiosWithRetry(CREATE_POST_MUTATION, {
    caption,
    image: imageBase64,
  });

  useEffect(() => {
    if (selectedFile && selectedFile.size > 750000) {
      setImageError('Image size must be less than 750kb');
      return;
    }
    if (selectedFile && selectedFile.size <= 750000) {
      if (step === 1) {
        setStep(step + 1);
      }
      if (step !== 4) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(selectedFile);
        fileReader.addEventListener('load', (event) => {
          console.log(event.target);
          setImageBase64(event.target?.result);
          const imgPreview = document.querySelector(
            '.createModal__imagePreview'
          ) as HTMLDivElement;
          imgPreview.style.display = 'block';
          imgPreview.innerHTML = `<img src="${event.target?.result}" alt=''/>`;
        });
      }
    }
  }, [selectedFile, setStep, step]);

  useEffect(() => {
    if (step === 2) {
      setTitle('Preview');
    }
    if (step === 1 || step === 3) {
      setTitle('Create new post');
    }
  }, [step]);

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
    setImageBase64('');
    setCaption('');
    setStep(1);
    setImageError('');
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    try {
      if (user.userId && imageBase64 && selectedFile) {
        handleSteps('next');
        await createPost();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
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

            {step === 1 && (
              <CreatePostChooseFile
                imageError={imageError}
                setSelectedFile={setSelectedFile}
              />
            )}

            {step > 1 && step < 4 && (
              <CreatePostDetails step={step} caption={caption} setCaption={setCaption} />
            )}

            {step === 4 && (
              <>
                {isLoading && <CreatePostLoading />}
                {!error && !isLoading && (
                  <CreatePostSuccess
                    handleDiscard={handleDiscard}
                    handleToggleCreatePostModal={handleToggleCreatePostModal}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CreatePost;
