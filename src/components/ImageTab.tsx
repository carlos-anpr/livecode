import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { ImageFile } from '../types/editor';

interface ImageTabProps {
    images: ImageFile[];
    setImages: (images: ImageFile[]) => void;
}

export function ImageTab({ images, setImages }: ImageTabProps) {
    const [isProcessing, setIsProcessing] = useState(false);

    const compressImage = useCallback(async (file: File) => {
        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            initialQuality: 0.8,
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const base64 = await encodeFileAsBase64URL(compressedFile);
            console.log(base64.substring(0, 100));

            return {
                id: crypto.randomUUID(),
                preview: base64,
                file: compressedFile,
                originalSize: file.size,
                compressedSize: compressedFile.size,
                originalName: file.name
            };
        } catch (error) {
            console.error('Error comprimiendo imagen:', error);
            throw error;
        }
    }, []);

    const deleteImage = async (imageId: string) => {
        const updatedImages = images.filter(img => img.id !== imageId);
        setImages(updatedImages);
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (images.length + acceptedFiles.length > 30) {
            alert('Máximo 30 imágenes permitidas');
            return;
        }

        setIsProcessing(true);
        try {
            const processedImages = await Promise.all(
                acceptedFiles.map(file => compressImage(file))
            );
            setImages([...images, ...processedImages]);
        } catch (error) {
            console.log(error);
            alert('Error procesando algunas imágenes');
        } finally {
            setIsProcessing(false);
        }
    }, [images, setImages, compressImage]);

    async function encodeFileAsBase64URL(file: File): Promise<string> {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                resolve(reader.result as string);
            });
            reader.readAsDataURL(file);
        });
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxSize: 2 * 1024 * 1024,
        maxFiles: 30
    });
    return (
        <div className="flex flex-col h-full bg-gray-900">
            <div
                {...getRootProps()}
                className={`
                    border-2 border-dashed rounded-lg mx-4 mt-4
                    transition-all duration-200 ease-in-out
                    flex flex-col items-center justify-center
                    h-[80px]
                    ${isDragActive
                        ? 'border-blue-400 bg-blue-500/10'
                        : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/50'
                    }
                `}
            >
                <input {...getInputProps()} />
                {isProcessing ? (
                    <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-blue-400 text-sm">Procesando...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <svg
                            className={`w-6 h-6 mb-2 ${isDragActive ? 'text-blue-400' : 'text-gray-500'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-300">Arrastra o selecciona imágenes</p>
                        <p className="text-xs text-gray-500">Max: 20 imágenes • 2MB c/u</p>
                    </div>
                )}
            </div>

            <div
                className="mx-4 mt-4 overflow-y-auto"
                style={{
                    height: 'calc(100vh - 220px)',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#4B5563 #1F2937'
                }}
            >
                <div className="grid auto-rows-fr gap-3 pb-4"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        maxWidth: '100%'
                    }}>
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="bg-white p-2 rounded-lg shadow-lg relative group overflow-hidden"
                            style={{
                                background: 'linear-gradient(to bottom, #fff 0%, #f0f0f0 100%)',
                                minWidth: '100px',
                                maxWidth: '200px'
                            }}
                        >
                            <button
                                onClick={() => {
                                    deleteImage(image.id).catch(error => {
                                        console.error('Error al eliminar:', error);
                                    });
                                }}
                                className="absolute top-2 right-2 bg-red-500/80 text-white rounded-full w-6 h-6 
                                         flex items-center justify-center opacity-0 group-hover:opacity-100 
                                         transition-all duration-200 z-10 hover:bg-red-500 shadow-lg"
                                title="Eliminar imagen"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="w-full relative mb-2" style={{ height: '85px' }}>
                                <img
                                    src={image.preview}
                                    alt="preview"
                                    className="absolute inset-0 w-full h-full object-cover rounded"
                                    onError={(e) => {
                                        console.error('Error loading image:', image.preview);
                                        e.currentTarget.src = 'fallback-image-url';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center 
                                              py-1 text-xs opacity-0 group-hover:opacity-100 transform translate-y-full 
                                              group-hover:translate-y-0 transition-all duration-200">
                                    {image.originalName}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[11px] text-gray-600 truncate font-medium">
                                    {image.originalName}
                                </p>
                                <div className="text-xs font-medium">
                                    <p className="flex justify-between items-center">
                                        <span className="text-gray-600">Orig:</span>
                                        <span className="text-gray-600">{(image.originalSize / (1024 * 1024)).toFixed(2)}MB</span>
                                    </p>
                                    <p className="flex justify-between items-center">
                                        <span className="text-gray-600">Comp:</span>
                                        <span className="text-gray-600">{(image.compressedSize / (1024 * 1024)).toFixed(2)}MB</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
