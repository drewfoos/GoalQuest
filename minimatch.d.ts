declare module "minimatch" {
  function minimatch(
    target: string,
    pattern: string,
    options?: minimatch.IOptions
  ): boolean;

  namespace minimatch {
    interface IOptions {
      debug?: boolean;
      nobrace?: boolean;
      noglobstar?: boolean;
      dot?: boolean;
      noext?: boolean;
      nocase?: boolean;
      nonull?: boolean;
      matchBase?: boolean;
      nocomment?: boolean;
      escape?: boolean;
      noquotes?: boolean;
      nonegate?: boolean;
      flipNegate?: boolean;
    }
  }

  export = minimatch;
}
