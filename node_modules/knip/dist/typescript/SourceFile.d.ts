import ts from 'typescript';
type SymbolTable = Map<string, ts.Symbol>;
type SymbolWithExports = ts.Symbol & {
    exports?: SymbolTable;
};
type PragmaMap = {
    arguments: {
        factory: string;
    };
};
export interface BoundSourceFile extends ts.SourceFile {
    symbol?: SymbolWithExports;
    resolvedModules?: ts.ModeAwareCache<ts.ResolvedModuleWithFailedLookupLocations>;
    locals?: SymbolTable;
    getNamedDeclarations?(): Map<string, readonly ts.Declaration[]>;
    scriptKind?: ts.ScriptKind;
    pragmas?: Map<string, PragmaMap | PragmaMap[]>;
}
export interface ProgramMaybe53 extends ts.Program {
    getResolvedModule?: (f: ts.SourceFile, moduleName: string, mode: ts.ResolutionMode) => ts.ResolvedModuleWithFailedLookupLocations | undefined;
}
export type GetResolvedModule = (name: string) => ts.ResolvedModuleWithFailedLookupLocations | undefined;
export {};
