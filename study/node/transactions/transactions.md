In the harsh **reality** of data systems, **many things can go wrong**:
• The database software or hardware may fail at any time (including in the middle
of a write operation).
• The application may crash at any time (including halfway through a series of
operations).
• Interruptions in the network can unexpectedly cut off the application from the
database, or one database node from another.
• Several clients may write to the database at the same time, overwriting each
other’s changes.
• A client may read data that doesn’t make sense because it has only partially been
updated.
• Race conditions between clients can cause surprising bugs.
In order to be reliable, a **system has to deal with these faults and ensure that they**
**don’t cause catastrophic failure of the entire system**

For decades, transactions have been the mechanism of choice for simplifying these
issues. **A transaction is a way for an application to group several reads and writes**
**together into a logical unit**. Conceptually, all the reads and writes in a transaction are
executed as one operation: **either the entire transaction succeeds** (commit) or it **fails**
(abort, rollback). If it fails, the application **can safely retry.** With transactions, error
handling becomes much simpler for an application, because it doesn’t need to worry
about partial failure—i.e., the case where some operations succeed and some fail (for
whatever reason).

 Transactions are not a law of nature; they were created with a purpose, namely **to simplify the programming model for applications accessing a database**. By using transactions, the application is free to ignore certain potential error scenarios and concurrency issues, because the **database takes care** of them instead (we call these safety guarantees).
 
Not every application needs transactions, and sometimes there are advantages to
weakening transactional guarantees or abandoning them entirely (for example, to
**achieve higher performance or higher availability**). Some safety properties can be
achieved without transactions.

**The Meaning of ACID**

The safety guarantees provided by transactions are often described by the well-
known acronym ACID, which stands for **Atomicity, Consistency, Isolation, and Dura‐**
**bility.**

**Atomicity**

In general, atomic refers to something that cannot be broken down into smaller parts.
The word means similar but subtly different things in different branches of compute.
For example, in multi-threaded programming, if one thread executes an atomic
operation, that means there is no way that another thread could see the half-finished
result of the operation. The system can only be in the state it was before the operation
or after the operation, not something in between.

By contrast, in the context of ACID, atomicity is not about concurrency. It does not
describe what happens if several processes try to access the same data at the same
time, because that is covered under the letter I, for isolation.

Rather, ACID atomicity describes what happens if a client wants to make several
writes, but a fault occurs after some of the writes have been processed—for example,
a process crashes, a network connection is interrupted, a disk becomes full, or some
integrity constraint is violated. If the writes are grouped together into an atomic
transaction, and the transaction cannot be completed (committed) due to a fault, then
the transaction is aborted and the database must discard or undo any writes it has
made so far in that transaction.

Without atomicity, if an error occurs partway through making multiple changes, it’s
difficult to know which changes have taken effect and which haven’t. The application
could try again, but that risks making the same change twice, leading to duplicate or
incorrect data. Atomicity simplifies this problem: if **a transaction was aborted, the**
**application can be sure that it didn’t change anything**, so **it can safely be retried.**
The ability to abort a transaction on error and have all writes from that transaction
discarded is the defining feature of ACID atomicity. Perhaps abortability would have
been a better term than atomicity, but we will stick with atomicity since that’s the
usual word.