# The "eth" ENR entry

This specification defines the "eth" ENR entry, which provides information
about the [eth capability] on a certain node.

## Entry Format

    entry-key   = "eth"
    entry-value = [[ forkHash, forkNext ]]

At this time, the "eth" entry is a single element list containing an [EIP-2124] fork ID
value. Please see the EIP for definitions of `forkHash` and `forkNext`.

In order to be compatible with future versions of this specifications, implementations
should ignore any additional list elements in `entry-value`.

## Change Log

### EIP-2124 (May 2019)

The initial version of the "eth" entry was proposed in [EIP-2124].

[eth capability]: ../caps/eth.md
[EIP-2124]: https://eips.ethereum.org/EIPS/eip-2124
