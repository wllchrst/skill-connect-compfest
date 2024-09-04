import { DocumentData, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default class FetchHelper<T> {
  getOne(query: Query<DocumentData, DocumentData>): {
    data: T | null;
    isLoading: boolean;
  } {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    function get() {
      try {
        const unsubscribe = onSnapshot(query, (snapshot) => {
          if (snapshot.docs[0] != undefined) {
            setData(snapshot.docs[0].data() as T);
            setIsLoading(false);
          } else {
            setData(null);
            setIsLoading(false);
          }
        });

        // Clean up the listener when component unmounts
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      get();
    }, []);

    return { data, isLoading };
  }

  getAll(query: Query<DocumentData, DocumentData>): {
    data: T[];
    isLoading: boolean;
  } {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    function get() {
      try {
        const unsubscribe = onSnapshot(query, (snapshot) => {
          if (snapshot.docs[0] != undefined) {
            setData(snapshot.docs.map((doc) => doc.data()) as T[]);
            setIsLoading(false);
          } else {
            setData([]);
            setIsLoading(false);
          }
        });

        // Clean up the listener when component unmounts
        return unsubscribe;
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      get();
    }, []);

    return { data, isLoading };
  }
}
