import { useSelector } from 'react-redux';

interface LoadingStates {
    fetchBooks: boolean;
    deleteBook: boolean;
    restoreBook: boolean;
    updateBook: boolean;
    FinalDeleteBook : boolean;
}

export const useLoadingState = (operations?: (keyof LoadingStates)[]) => {
    const loadingStates = useSelector((state: any) => state.counter.loadingStates);

    if (!operations) {
        // If no specific operations are provided, check if any operation is loading
        return Object.values(loadingStates).some(state => state === true);
    }

    // Check if any of the specified operations are loading
    return operations.some(operation => loadingStates[operation] === true);
};

export const useLoadingStates = () => {
    return useSelector((state: any) => state.counter.loadingStates);
}; 