export interface Manifest {
    name?: string;
    version?: string;
    dependencies?: {
        [name: string]: string;
    };
    devDependencies?: {
        [name: string]: string;
    };
    optionalDependencies?: {
        [name: string]: string;
    };
}
export interface Package {
    manifest: Manifest;
    dir: string;
}
export interface PackageNode<T> {
    package: Package & T;
    dependencies: string[];
}
export declare function createPkgGraph<T>(pkgs: Array<Package & T>, opts?: {
    ignoreDevDeps?: boolean;
    linkWorkspacePackages?: boolean;
}): {
    graph: Record<string, PackageNode<T>>;
    unmatched: Array<{
        pkgName: string;
        range: string;
    }>;
};
