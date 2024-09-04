type Func = () => void;

export default function mergeRegister(...func: Array<Func>): () => void {
  return () => {
    for (let i = func.length - 1; i >= 0; i--) {
      func[i]();
    }
    // Clean up the references and make future calls a no-op
    func.length = 0;
  };
}
