#pragma strict

var radius = 1.0;
var ecc = 0.3;
var omega = 1.0;
var phi = 0.0;

var volume = 0.3;

private var theta = Mathf.PI;

function Start() {
	radius = transform.position.magnitude / 2;
	phi = Mathf.Atan2(-transform.position.y, -transform.position.x);
}

function Update() {
	var r = radius / (1.0 + ecc * Mathf.Cos(theta));

	transform.localPosition.x = r * Mathf.Cos(theta + phi);
	transform.localPosition.y = r * Mathf.Sin(theta + phi);

	theta += omega / (r * r);

	audio.volume = (1.0 + Mathf.Cos(theta)) * volume / 2;
}

function Terminate() {
	StartCoroutine(function() {
		while (transform.localScale.x > 0.02) {
			var e = Mathf.Exp(-4.0 * Time.deltaTime);
			transform.localScale *= e;
			volume *= e;
			yield;
		}
		Destroy(gameObject);
	}());
}