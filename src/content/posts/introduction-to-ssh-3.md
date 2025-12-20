---
slug: introduction-to-ssh-part-3
title: Introduction to SSH (Part 3)
date: 2025-12-17
primaryCategory: DevOps
categories:
  - DevOps
  - Security
  - Networking
tags:
  - ssh
  - linux
  - remote-access
  - cybersecurity
excerpt: Part 3 of the SSH guide—security best practices, a glimpse of advanced features, and why SSH mastery matters for DevOps and cloud.
coverImage: /images/posts/ssh-intro.jpg
status: published
author: David Essien
authorImage: /images/david-author.jpg
draft: false
---

## SSH Security Best Practices

Even though SSH is secure by design, configuration mistakes can still expose you. These practices help harden your setup.

### Prefer Key-Based Authentication

Once your SSH keys are working reliably, disable password authentication on servers to reduce brute‑force attacks.

On many Linux systems, edit `/etc/ssh/sshd_config`:

PasswordAuthentication no
PubkeyAuthentication yes

Then restart the SSH daemon:

sudo systemctl restart sshd

Always test in a second session before closing your original one to avoid locking yourself out.

### Use Strong, Modern Keys

Recommended:

- Prefer **Ed25519**:
  ssh-keygen -t ed25519

- If you must use RSA:
  ssh-keygen -t rsa -b 4096

Avoid weak or deprecated key types and short key lengths.

### Protect Your Private Key

Treat your private key like a master password:

- Always use a **passphrase**.
- Restrict permissions:
  chmod 600 ~/.ssh/id_ed25519
- Never:
- Email it.
- Store it unencrypted in shared drives.
- Commit it to Git, even in private repos.

If a private key might be compromised:

1. Generate a new key pair.
2. Add the new public key to servers.
3. Remove the old key from `authorized_keys`.

### Limit SSH Exposure

Reduce your attack surface:

- Restrict SSH access using firewalls or security groups:
- Allow only known IPs (VPN, office, bastion host).
- Consider:
- Changing the default port (not security by itself, but reduces noise).
- Using a **bastion host** to reach private servers.
- Combining SSH with a VPN for sensitive environments.

### Disable Root Login (When Possible)

Instead of logging in as `root`:

1. Create a non‑root user (e.g., `deploy`, `ubuntu`).
2. Give it `sudo` rights.
3. Disable direct root SSH login in `/etc/ssh/sshd_config`:

PermitRootLogin no

Then restart `sshd`.

This forces attackers to guess both a username and a key/password, and encourages better operational hygiene.

---

## Advanced SSH Features (Brief Preview)

Once you’re comfortable with basics, SSH has powerful features that are heavily used in DevOps.

### Port Forwarding (Tunneling)

SSH can securely forward ports, letting you access remote services as if they were local.

**Local port forwarding** (access a remote service locally):

ssh -L 8080:localhost:80 user@server_ip

- Connects to `server_ip`.
- Forwards your local `localhost:8080` to `server_ip:80`.
- You can then open `http://localhost:8080` to reach the remote web server securely.

**Remote port forwarding** (expose a local service on the remote machine):

ssh -R 8080:localhost:3000 user@server_ip

text

Useful for reverse tunnels, demos, and temporary access to internal apps.

### Bastion / Jump Hosts

In stricter environments, production servers are not exposed directly to the internet. Instead, you:

1. Connect to a **bastion (jump) host**.
2. From there, connect to internal servers.

With modern OpenSSH, you can do this in one command:

ssh -J bastion_user@bastion_ip user@internal_server

text

Or configure this in `~/.ssh/config` for cleaner usage.

---

## Why SSH Mastery Matters

SSH is more than a command; it’s part of how you think about secure access:

- **Security**:  
  It enforces encrypted, authenticated connections over untrusted networks.

- **Auditability and control**:  
  Keys can be added, rotated, and revoked. Access can be scoped per user and per machine.

- **Automation and scale**:  
  CI/CD tools, configuration management, and one‑off scripts routinely depend on SSH for remote operations.

- **Real-world readiness**:  
  Whether you are:

  - Debugging a production incident.
  - Bootstrapping a new cloud server.
  - Syncing backups to a remote host.

  SSH is usually the first and last tool you touch.

Strong systems begin with secure connections.  
In modern DevOps, that connection almost always starts with `ssh`.
