import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useParams } from "react-router-dom";
import { S3 } from "~/utils/s3";
import { Bucket, BucketFile } from "~/utils/types";

interface ServerDataContextType {
    s3: S3;
    buckets: any[];
    currentBucket: Bucket | undefined;
    files: any[];
    bucketsLoading: boolean;
    filesLoading: boolean;
    updateBuckets: () => Promise<Bucket[]>;
    updateFiles: (id: string) => Promise<BucketFile[]>;
}

const ServerDataContext = createContext<ServerDataContextType | undefined>(
    undefined
);

export const ServerDataProvider = ({
    children,
    s3,
}: {
    children: ReactNode;
    s3: S3;
}) => {
    const { bucket_id } = useParams();
    const [buckets, setBuckets] = useState<Bucket[]>([]);
    const [bucketsLoading, setBucketsLoading] = useState(true);
    const [files, setFiles] = useState<any[]>([]);
    const [filesLoading, setFilesLoading] = useState(true);
    const [currentBucket, setCurrentBucket] = useState<Bucket | undefined>(
        undefined
    );

    useEffect(() => {
        setCurrentBucket(
            buckets.find((x) => x.name === bucket_id) || undefined
        );
    }, [buckets, bucket_id]);

    const updateBuckets = async (showLoading: boolean = true) => {
        if (showLoading) setBucketsLoading(true);
        const bkts = await s3.fetchBuckets();
        setBuckets(bkts);
        setBucketsLoading(false);
        return bkts;
    };

    const updateFiles = async (id: string, showLoading: boolean = true) => {
        if (showLoading) setFilesLoading(true);
        const fls = await s3.fetchBucketFiles(id);
        setFiles(fls);
        setFilesLoading(false);
        return fls;
    };

    return (
        <ServerDataContext.Provider
            value={{
                s3,
                buckets,
                files,
                currentBucket,
                bucketsLoading,
                filesLoading,
                updateBuckets,
                updateFiles,
            }}
        >
            {children}
        </ServerDataContext.Provider>
    );
};

export const useServerDataContext = () => {
    const context = useContext(ServerDataContext);
    if (!context) {
        throw new Error(
            "useServerDataContext must be used within an ServerDataProvider"
        );
    }
    return context;
};
