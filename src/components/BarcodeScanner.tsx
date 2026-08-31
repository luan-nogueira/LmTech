'use client';
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X } from 'lucide-react';

interface BarcodeScannerProps {
  onResult: (text: string) => void;
  onClose: () => void;
}

export function BarcodeScanner({ onResult, onClose }: BarcodeScannerProps) {
  const [hasError, setHasError] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    let isMounted = true;
    const scanner = new Html5Qrcode("reader");
    scannerRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          { 
            fps: 10, 
            qrbox: { width: 250, height: 150 }
          },
          (decodedText) => {
            if (isMounted) {
              scanner.stop().then(() => {
                onResult(decodedText);
              }).catch(console.error);
            }
          },
          (errorMessage) => {
            // Ignora os logs de "não achou"
          }
        );
      } catch (err) {
        console.error("Erro ao iniciar câmera:", err);
        if (isMounted) setHasError(true);
      }
    };

    startScanner();

    return () => {
      isMounted = false;
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [onResult]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-[var(--color-surface)] w-full max-w-sm rounded-3xl overflow-hidden flex flex-col p-4 relative border border-[var(--color-border)] shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-[var(--color-background)] hover:bg-red-50 rounded-full z-10 text-[var(--color-text-muted)] transition-colors">
           <X size={20} />
        </button>
        <h2 className="text-center font-bold text-[var(--color-text)] mb-4 pt-1">Escanear Código</h2>
        
        {hasError ? (
          <div className="text-center p-6 bg-red-50 text-red-600 rounded-xl">
            <p className="font-semibold">Erro na Câmera</p>
            <p className="text-sm mt-1 text-red-500/80">Verifique se você deu permissão de uso da câmera para o site.</p>
          </div>
        ) : (
          <div className="relative w-full rounded-xl overflow-hidden bg-black flex items-center justify-center min-h-[200px]">
            <div id="reader" className="w-full"></div>
          </div>
        )}

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-4">
          Aponte a câmera para o código de barras da embalagem.
        </p>
      </div>
    </div>
  );
}
