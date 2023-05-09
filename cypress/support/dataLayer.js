export const callsTo = spy =>
  spy
    .getCalls()
    .map(
      call =>
        call.args.length && call.args.length === 1 && call.args[0].length
          ? [...call.args[0]]
          : call.args
    );
