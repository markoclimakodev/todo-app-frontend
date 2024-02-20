export interface UseCase<I , O> {
    execute( data: I ): Promise<O>
}
