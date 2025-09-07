---
name: Proposal — Add/Modify Tactic / Technique / Vulnerability / Exploit
about: Suggest a structured change to the PHYS‑ATT&CK dataset
labels: proposal
---

## Type of change
- [ ] Tactic
- [ ] Technique
- [ ] Vulnerability (condition)
- [ ] Exploit (vendor/model specific)

## Summary
**Title:**  
**Description:** (what this is and why it matters)

## Details
### For Techniques
- **Parent tactic:**  
- **Technique name:**  
- **Subtechniques (list):**  

### For Vulnerabilities
- **Technique it enables:**  
- **linked_subtechnique:** (must exist in the technique's subtechniques)  
- **Evidence:**  
- **Likelihood (0..1):**  
- **Impact (0..1):**  
- **Detectability (0..1):**  
- **Standards refs:** (UL, ANSI/BHMA, IBC/IFC, IES, NIST, etc.)  

### For Exploits
- **Vendor:**  
- **Model:**  
- **Exploit name:**  
- **Vector:**  
- **Prereqs:**  
- **Maturity:** (poc | weaponized | widely_available)  
- **Affected environments:**  
- **Standards refs:**  
- **References:** (avoid procedural detail in public; link to restricted channels)

## Acceptance checklist
- [ ] JSON validates against `schema/phys-attack.schema.json`
- [ ] `npm run lint` passes (standards_ref present; linked_subtechnique exists)
- [ ] No procedural exploit detail included
