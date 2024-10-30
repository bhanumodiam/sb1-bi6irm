import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Camera, Sparkles, Download } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';

export default function AICamera() {
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('none');
  const [processing, setProcessing] = useState(false);

  const filters = [
    { name: 'none', label: 'Original' },
    { name: 'ai-portrait', label: 'AI Portrait' },
    { name: 'neural-style', label: 'Neural Style' },
    { name: 'mood-enhance', label: 'Mood Enhance' }
  ];

  const capture = useCallback(async () => {
    if (webcamRef.current) {
      setProcessing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      
      if (imageSrc && filter !== 'none') {
        // Load TensorFlow.js model and apply AI filter
        try {
          const model = await tf.loadLayersModel('/models/filter-model.json');
          const img = new Image();
          img.src = imageSrc;
          await img.decode();
          
          const tensor = tf.browser.fromPixels(img)
            .expandDims(0)
            .toFloat()
            .div(255);
            
          const prediction = model.predict(tensor) as tf.Tensor;
          const processedImage = await tf.browser.toPixels(prediction.squeeze());
          setPhoto(URL.createObjectURL(new Blob([processedImage], { type: 'image/jpeg' })));
        } catch (error) {
          console.error('Error applying AI filter:', error);
          setPhoto(imageSrc);
        }
      } else {
        setPhoto(imageSrc);
      }
      setProcessing(false);
    }
  }, [filter, webcamRef]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-4 bg-white rounded-lg overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">AI Camera</h2>
            <button className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
        </div>

        <div className="relative">
          {!photo ? (
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full aspect-square object-cover"
            />
          ) : (
            <img
              src={photo}
              alt="Captured"
              className="w-full aspect-square object-cover"
            />
          )}

          {processing && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
            </div>
          )}
        </div>

        <div className="p-4 space-y-4">
          <div className="flex justify-center space-x-2">
            {filters.map((f) => (
              <button
                key={f.name}
                onClick={() => setFilter(f.name)}
                className={`px-4 py-2 rounded-full text-sm ${
                  filter === f.name
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            {!photo ? (
              <button
                onClick={capture}
                className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                disabled={processing}
              >
                <Camera className="w-5 h-5 mr-2" />
                Capture
              </button>
            ) : (
              <>
                <button
                  onClick={() => setPhoto(null)}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Retake
                </button>
                <button
                  onClick={() => {/* Handle post creation */}}
                  className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Post
                </button>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = photo;
                    link.download = 'ai-photo.jpg';
                    link.click();
                  }}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}